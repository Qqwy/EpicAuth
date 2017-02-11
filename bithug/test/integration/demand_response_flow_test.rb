require 'test_helper'

class DemandResponseFlowTest < ActionDispatch::IntegrationTest
  # test "the truth" do
  #   assert true
  # end
  test "hard-coded default demand works" do
    get '/index/login_redirect_to_app'
    assert_response 302

    post '/hooks/check_demand_response', format: :json
    puts response.body
    token = JSON.parse(response.body)["token"]
    assert_response :success

    get "/hooks/token/#{token}"
    assert_response :success
  end
end
