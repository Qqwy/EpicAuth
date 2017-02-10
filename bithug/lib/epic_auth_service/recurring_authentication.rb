module EpicAuth
  module Service
    class RecurringAuthentication < Base
      # Handles the case of a Recurring Authentication.
      # Initialized with a Authentication Token which will be checked for validity.

      attr_accessor :encrypted_authentication_token, :authentication_token, :verification_procedure

      def initialize(encrypted_authentication_token: '123456', verification_procedure: Proc.new{ true }, **rest)
        super(**rest)
        self.encrypted_authentication_token = encrypted_authentication_token
      end

      def authentication_token
        self[:authentication_token] ||= decrypt_authentication_token(self.encrypted_authentication_token)
      end

      # TODO: stub
      def decrypt_authentication_token(_authentication_token)
        self[:authentication_token] = {'timestamp' => 1.minute.ago, 'user_id' => 1}
      end
    end
  end
end
