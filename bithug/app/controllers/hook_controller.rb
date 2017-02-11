# ToDo:
# - Check of data dezelfde is als gevraagde data (correct antwoord op demand)
# - Check signatures van data snippets (ethereum gem)
require './lib/epic_auth_service.rb'

class HookController < ApplicationController

  def token
    token = EpicAuth::Service::AuthenticationToken.decrypt(params[:token])
    if Time.at(token.iat).to_datetime < 1.month.ago
      render ''
    end
    @user = User.find(token.user_id)
  end

  def check_demand_response
    response = JSON.parse(params[:response]).with_indifferent_access

    snippets = response[:share_data].inject([]) do |snippets, data_snippet|
      snippets << EpicAuth::Service::VerifiedDataSnippet.new(
          data_snippet[:key],
          data_snippet[:data],
          data_snippet[:verifier_id],
          data_snippet[:subject],
          data_snippet[:revocation_ref],
          data_snippet[:verifier_signature]
      )
    end

    config = EpicAuth::Service::Config.new

    valid = true
    demand_responses = []
    config.demand_requests.each do |request|
      demand_response = snippets.find{|snippet| snippet.key == request[:type] && request[:validated_by].any? {|validator| snippet.verifier_id == validator[:address] } }
      valid = false unless demand_response || request[:optional]
      return render status: 401 unless valid
      demand_responses << demand_response if demand_response
    end

    #TODO: Ethereum verification
    metadata = config.successful_response_callback.() || Hash.new
    token = EpicAuth::Service::AuthenticationToken.new(response[:user_id], metadata)

    return render json: { token: token.encrypt }
  end
  
end
