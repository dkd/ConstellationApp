Constellation::Application.routes.draw do
  devise_for :users

  # Resources
  resources :views
  resources :log_entries

  # Point the home page to /views
  root :to => "views#index"
end
