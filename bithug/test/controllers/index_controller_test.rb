require 'test_helper'

class IndexControllerTest < ActionDispatch::IntegrationTest
  test "should get login" do
    get login_url
    assert_response :success
  end

  test "should get dashboard" do
    get dashboard_url
    assert_response :success
  end

  test "should get logout" do
    get logout_url
    assert_response 302
  end

  test "should get download_verification" do
    get download_verification_url
    assert_response :success
  end

end
