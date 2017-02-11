class HookController < ApplicationController

  def token
    token = params[:token]
    puts token
  end
end