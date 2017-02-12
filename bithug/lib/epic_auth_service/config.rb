module EpicAuth
  module Service
    class Config
      attr_reader :demands
      attr_accessor :successful_response_callback

      def initialize(demands = nil, successful_response_callback = nil)
        @demands = demands || self.class.standard_demands
        self.successful_response_callback = successful_response_callback || Proc.new { }
      end

      def demand_requests
        demands[:requests]
      end

      def self.standard_demands
        {
            title: 'Login to Bithug website',
            explanation: 'You you want to use our service, please allow us to send you spam on your mail and maybe call you on inpropriate times.',
            requests: [
                {
                    type: "email",
                    optional: false,
                    validated_by: [
                        {
                            site: "github.com",
                            address: 0xDEADBEEF
                        },
                        {
                            site: "google.com",
                            address: 0xCAFEBABE
                        }
                    ]
                },
                {
                    type: "phone",
                    optional: true,
                    validated_by: [
                        {
                            site: "github.com",
                            address: 0xDEADCAFE
                        },
                        {
                            site: "google.com",
                            address: 0xCAFEBABE
                        }
                    ]
                }
            ]
        }
      end

      def self.standard_response
        {
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
        }.with_indifferent_access
      end
    end
  end
end
