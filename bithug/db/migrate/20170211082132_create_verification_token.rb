class CreateVerificationToken < ActiveRecord::Migration[5.0]
  def change
    create_table :verification_tokens do |t|
      t.string :address, null: false
      t.integer :user_id
    end
  end
end
