module EpicAuth
  module Service
    class Base
      # Common data shared between different protocol paths.
      # Knows how to find pub/priv key pairs etc.

      # TODO: How to store/retrieve private keys to sign stuff with?
      # Publicly-known Address of this Service on the Ethereum blockchain.
      attr_accessor :blockchain_address

      # Publicly-known Address of the User Identity that talks to this Service.
      attr_accessor :identity_blockchain_address

      def initialize(blockchain_address: '12345', identity_blockchain_address: '23456')
        self.blockchain_address = blockchain_address
        self.identity_blockchain_address = identity_blockchain_address
      end
    end
  end
end
