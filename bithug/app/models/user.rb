# == Schema Information
#
# Table name: users
#
#  id    :integer          not null, primary key
#  email :string
#  name  :string
#

class User < ActiveRecord::Base
  has_one :verification_token, dependent: :destroy
end
