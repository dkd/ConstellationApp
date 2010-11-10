Constellation::Application.routes.draw do
  devise_for :users

  # Resources
  resources :views
  resources :log_entries
  resources :users

  # Point the home page to /views
  root :to => "welcome#index"
end
