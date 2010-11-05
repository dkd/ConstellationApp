class AddViewIdToFilters < ActiveRecord::Migration
  def self.up
    add_column :filters, :view_id, :integer
  end

  def self.down
    remove_column :filters, :view_id
  end
end
