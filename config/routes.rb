Rails.application.routes.draw do

root 'splash#index'
get 'testprint883' => 'splash#test'

get 'test' => 'dashboards#test'
get 'dashboard' => 'dashboards#index', as: :dashboard
get 'fingerprint' => 'dashboards#fingerprint', as: :fingerprint
post 'fingerprint' => 'dashboards#record_fingerprint', as: :record_fingerprint

resources :users

post 'login' => 'sessions#create', as: :logging_in
get 'logout' => 'sessions#destroy', as: :logout

end
