module ApplicationHelper
  # return the correct javascript files depending on if the user is logged in or logged out
  def include_javascript
    if user_signed_in?
      javascript_include_tag("ext/adapter/ext/ext-base", "ext/ext-all", "GroupTab",
                              "GroupTabPanel", "TabCloseMenu", "constellation",
                              "application", :cache => true)
    else
      javascript_include_tag("ext/adapter/ext/ext-base", "ext/ext-all", :cache => "login")
    end
  end
end
