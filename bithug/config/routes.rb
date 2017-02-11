Rails.application.routes.draw do
  get 'index/login'

  get 'index/dashboard'

  get 'index/logout'

  get 'index/download_verification'

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
