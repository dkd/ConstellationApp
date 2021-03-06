require "bundler/capistrano"

# use local SSH keys
ssh_options[:forward_agent] = true

set :application, "constellation"
set :user,        "dkd"

set :scm,         :git
set :deploy_via,  :copy
set :repository,  "git@git.dkd.de:constellation-app.git"
set :use_sudo,    false

set :deploy_to,   "/var/www/demo.constellationapp.org"
default_run_options[:pty] = true

#role :web, "vm-03.27.dkd.de", :port => 5022, :user => "dkd"
#role :app, "vm-03.27.dkd.de", :port => 5022, :user => "dkd"
#role :db,  "vm-03.27.dkd.de", :primary => true, :port => 5022, :user => "dkd"

server "vm-03.27.dkd.de", :app, :web, :db, :user => "dkd", :port => 5022

namespace :deploy do
  task :cold do
    update
    load_schema       # My own step, replacing migrations.
    start
  end

  task :load_schema, :roles => :app do
    run "cd #{current_path}; RAILS_ENV=production rake db:create"
    run "cd #{current_path}; RAILS_ENV=production rake db:schema:load"
    run "cd #{current_path}; RAILS_ENV=production rake db:seed"
  end

  %w(start stop restart).each do |action|
     desc "#{action} the Thin processes"
     task action.to_sym do
       run "/etc/init.d/thin #{action} -C /etc/thin/#{application}.yml"
    end
  end
end

after "deploy", "deploy:cleanup", "deploy:symlink", "deploy:restart"

