require 'test_helper'

class IndexControllerTest < ActionDispatch::IntegrationTest
  test "should get login" do
    get index_login_url
    assert_response :success
  end

  test "should get dashboard" do
    get index_dashboard_url
    assert_response :success
  end

  test "should get logout" do
    get index_logout_url
    assert_response :success
  end

  test "should get download_verification" do
    get index_download_verification_url
    assert_response :success
  end

end
