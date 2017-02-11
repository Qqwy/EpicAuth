
module EpicAuth
  module Service
    class Authentication < Base
      # Handles Authentication Path where user identity authenticates for the first time.
      def initialize(to_be_verified_datasnippets: [])

      end

      def create_authentication_token(metadata = {})
        metadata[:creation_timestamp] = DateTime.now.utc.to_i
        auth_token_public_key.encrypt(metadata.to_json)
        # TODO: Store in Blockchain.
      end

    end
  end
end
