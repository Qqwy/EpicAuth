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
        YAML.load_file('lib/epic_auth_service/standard_demands.yaml')
      end

      def self.stub_verification
        YAML.load_file('lib/epic_auth_service/stub_verification.yaml')
      end
    end
  end
end
