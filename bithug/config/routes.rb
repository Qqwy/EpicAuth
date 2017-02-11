Rails.application.routes.draw do
  get 'index/login' # Login form.
  get 'index/login_redirect_to_app', as: :login_redirect_to_app

  get 'index/dashboard' # Page for when logged in.

  get 'index/logout' # Redirect action to destroy session.

  get 'index/download_verification' # Initiates verification step where user obtains extra verification info.

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root controller: :index, action: :login
end
