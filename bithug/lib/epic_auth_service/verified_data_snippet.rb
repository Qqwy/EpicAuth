# coding: utf-8
require 'openssl'

module EpicAuth
  module Service
    # Description of the kind of (verified) datasnippet that User needs to send.
    class VerifiedDataSnippet
      attr_accessor :key, :value, :verifier_id, :subject_id, :revocation_ref, :verifier_signature

      def initialize(key, value, verifier_id, subject_id, revocation_ref, verifier_signature)
        self.key = key
        self.value = value
        self.verifier_id = verifier_id
        self.subject_id = subject_id
        self.revocation_ref = revocation_ref
        self.verifier_signature = verifier_signature
      end

      def proper_verification_of?(tbvd)
        key == tbvd.key && verifier_id == tbvd.verifier_id && valid_signature?
      end

      def valid_for_identity?(subject_id)
        self.subject_id == subject_id && valid_signature?
      end

      def valid_signature?
        # check correctness of signature on data
        # check if signature and verifier_id match
        raise NotImplementedError
      end

      # NOTE: Naïve implementation. High time complexity. Can be improved.
      def self.match_list_against_tbvds(vds_list, tbvds_list)
        tbvds_list.map do |tbvds_alternatives_set|
          tbvds_alternatives_set.find do |tbvds|
            vds_list.find { |vds| vds.proper_verification_of?(tbvds) }
          end
        end
      end
    end
  end
end
