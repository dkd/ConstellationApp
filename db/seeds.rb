# Create an initial user
user = User.create(:email => "admin@constellationapp.org", :password => "password", :password_confirmation => "password")
user.views.create(:title => "All log entries")
