# == Schema Information
#
# Table name: verification_tokens
#
#  id      :integer          not null, primary key
#  address :string           not null
#  user_id :integer
#

class VerificationToken < ActiveRecord::Base
  belongs_to :user
end
