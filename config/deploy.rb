require "bundler/capistrano"

ssh_options[:keys] = %w(/Users/stefan/.ssh/dkd_maintenance_dsa)
# use local SSH keys
ssh_options[:forward_agent] = true

set :application, "demo.constellationapp.org"
set :user,        "dkd"

set :scm,         :git
set :deploy_via,  :checkout
set :repository,  "ssh://root@git.dkd.de:5022/var/cache/git/constellation_app.git"
set :use_sudo,    false
# helps keep mongrel pid files clean
set :mongrel_clean, true

set :deploy_to, "/var/www/demo.constellationapp.org"
default_run_options[:pty] = true

role :web, "vm-03.27.dkd.de", :port => 5022, :user => "dkd"
role :app, "vm-03.27.dkd.de", :port => 5022, :user => "dkd"
role :db,  "vm-03.27.dkd.de", :primary => true, :port => 5022, :user => "dkd"

namespace :deploy do
  task :cold do
    update
    load_schema       # My own step, replacing migrations.
    start
  end

  task :load_schema, :roles => :app do
    run "cd #{current_path}; RAILS_ENV=production rake db:create"
    run "cd #{current_path}; RAILS_ENV=production rake db:schema:load"
  end

  %w(start stop restart).each do |action|
     desc "#{action} the Thin processes"
     task action.to_sym do
       run "sudo /etc/init.d/thin #{action}"
    end
  end
end

after "deploy", "deploy:cleanup", "deploy:symlink", "deploy:restart"

