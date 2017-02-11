require 'test_helper'

require './lib/epic_auth_service.rb'
# Tests :D
class AuthenticationTokenTest < ActiveSupport::TestCase
  test "The truth!" do
    assert true
  end

  test "Encryption and Decryption are inverse" do
    a = EpicAuth::Service::AuthenticationToken.new(1, {a: 1, b: 2}, DateTime.now.utc.to_i)
    assert_equal(a, EpicAuth::Service::AuthenticationToken.decrypt(a.encrypt))
  end
end
