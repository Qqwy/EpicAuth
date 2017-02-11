require 'openssl'

module EpicAuth
  module Service
    class AuthenticationToken

      attr_accessor :metadata, :user_id, :iat

      def initialize(user_id, metadata = {}.with_indifferent_access)
        self.user_id = user_id
        self.metadata = metadata
        # TODO: Store in Blockchain.
      end

      def encrypt
        data = metadata
        data[:user_id] = user_id
        data[:iat] = DateTime.now.utc.to_i
        Base64.encode64(public_key.public_encrypt(data.to_json))
      end

      def self.decrypt(string)
        self.metadata = JSON.parse(auth_token_private_key.private_decrypt(Base64.decode64(string))).with_indifferent_access
      end

      # FUTURE: Better security by encrypting key with pass stored in ENV.
      def private_key
        OpenSSL::PKey::RSA.new File.read 'crypto_keys/auth_token_private_key.pem'
      end

      def public_key
       private_key.public_key
      end
    end
  end
end
