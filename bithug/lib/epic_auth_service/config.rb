module EpicAuth
  module Service
    class Config
      attr_reader :demands
      attr_accessor :successful_response_callback

      def initialize(demands = nil, successful_response_callback = nil)
        self.demands = demands || self.class.standard_demands
        self.successful_response_callback = successful_response_callback || Proc.new
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
    end
  end
end