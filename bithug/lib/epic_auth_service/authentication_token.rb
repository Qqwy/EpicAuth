require 'openssl'

module EpicAuth
  module Service
    class AuthenticationToken
      attr_accessor :metadata, :user_id, :iat

      def initialize(user_id, metadata = {}.with_indifferent_access, iat = nil)
        self.user_id = user_id
        self.iat = iat
        self.metadata = metadata
        # TODO: Store in Blockchain.
      end

      def encrypt
        data = metadata
        data[:user_id] = user_id
        data[:iat] = (iat || DateTime.now.utc).to_i
        Base64.encode64(public_key.public_encrypt(data.to_json))
      end

      def self.decrypt(string)
        data = JSON.parse(private_key.private_decrypt(Base64.decode64(string))).with_indifferent_access
        user_id = data[:user_id]
        iat = data[:iat]
        metadata = data.except(:user_id, :iat)
        new(user_id, metadata, iat)
      end

      # FUTURE: Better security by encrypting key with pass stored in ENV.
      def self.private_key
        OpenSSL::PKey::RSA.new File.read 'crypto_keys/auth_token_private_key.pem'
      end

      def self.public_key
        private_key.public_key
      end
    end
  end
end
