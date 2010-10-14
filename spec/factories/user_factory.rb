Factory.define :user do |u|
  u.email                 "tester@constellationapp.org"
  u.login                 "Testing guy"
  u.password              "secret"
  u.password_confirmation "secret"
end