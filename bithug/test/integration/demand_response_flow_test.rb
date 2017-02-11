require 'test_helper'

class DemandResponseFlowTest < ActionDispatch::IntegrationTest
  # test "the truth" do
  #   assert true
  # end
  test "hard-coded default demand works" do
    get '/index/login_redirect_to_app'
    assert_response 302

    input_response = {
      user_id: 1,
      share_data: [
        {
          key: 'email',
          subject: 'public_key',
          data: 'test@epicauth.org',
          revocation_ref: '123456789',
          verifier_id: 0xDEADBEEF,
          verifier_signature: 'AFEA234253235'
        },
        {
          key: 'phone',
          subject: 'public_key',
          data: '+123456789',
          revocation_ref: '123456789',
          verifier_id: 'facebook.com',
          verifier_signature: 'ASDAFGARASASD2342346'
        },
      ]
    }.to_json


    post '/hooks/check_demand_response', {params: {response: input_response, format: :json}}
    token = JSON.parse(response.body)["token"]
    assert_response :success

    get "/hooks/token/#{token}"
    assert_response :success
  end
end
