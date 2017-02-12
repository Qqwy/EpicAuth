Rails.logger.debug "TODO: Check of data dezelfde is als gevraagde data (correct antwoord op demand)"
Rails.logger.debug "TODO:Check signatures van data snippets (ethereum gem)"
require './lib/epic_auth_service.rb'

class HookController < ApplicationController
  skip_before_filter :verify_authenticity_token, only: :check_demand_response

  def token
    token = EpicAuth::Service::AuthenticationToken.decrypt(params[:token])
    if Time.at(token.iat).to_datetime < 1.month.ago
      render ''
    end
    user = User.find(token.user_id)
    redirect_to dashboard_path if user
  end

  def check_demand_response
    snippets = create_snippets(params[:response])
    config = EpicAuth::Service::Config.new
    valid = true
    demand_responses = []
    config.demand_requests.each do |request|
      demand_response = snippets.find{|snippet| snippet.key == request[:type] && request[:validated_by].any? {|validator| snippet.verifier_id == validator[:address] } }
      valid = false unless demand_response || request[:optional]
      break unless valid
      demand_responses << demand_response
    end
    config.successful_response_callback
    render json: { token: EpicAuth::Service::AuthenticationToken.new(params[:response][:user_id]).encrypt}.to_json
  end

  def create_snippets(response)
    @snippets = response[:share_data].inject([]) do |snippets, data_snippet|
      snippets << EpicAuth::Service::VerifiedDataSnippet.new(
          data_snippet[:key],
          data_snippet[:data],
          data_snippet[:verifier_id],
          data_snippet[:subject],
          data_snippet[:revocation_ref],
          data_snippet[:verifier_signature]
      )
    end
  end
end
