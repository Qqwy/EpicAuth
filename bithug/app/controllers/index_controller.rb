require 'base64'
require './lib/epic_auth_service'

class IndexController < ApplicationController

  def login
  end

  def login_redirect_to_app
    demands = Base64.encode64(EpicAuth::Service::Config.standard_demands.to_json)
    redirect_to "epicauth://#{demands}"
  end

  def dashboard
  end

  def logout
    redirect_to :login
  end

  def download_verification
    response = {
        key: 'email',
        subject: 'public_key',
        data: 'test@epicauth.org',
        revocation_ref: '123456789',
        verifier_id: 0xDEADBEEF,
        verifier_signature: 'AFEA234253235'
    }

    render json: EpicAuth::Service::VerifiedDataSnippet.new(
        response[:key],
        response[:data],
        response[:verifier_id],
        response[:subject],
        response[:revocation_ref],
        response[:verifier_signature]
    )
  end
end
