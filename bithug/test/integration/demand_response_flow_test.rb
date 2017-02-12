require 'test_helper'
require './lib/epic_auth_service'

class DemandResponseFlowTest < ActionDispatch::IntegrationTest
  # test "the truth" do
  #   assert true
  # end
  test "hard-coded default demand works" do
    get '/index/login_redirect_to_app'
    assert_response 302

    post '/hooks/check_demand_response', {params: {response: EpicAuth::Service::Config.standard_response, format: :json}}
    token = JSON.parse(response.body)["token"]
    assert_response :success

    get "/hooks/token/#{token}"
    assert_response 302
  end
end
