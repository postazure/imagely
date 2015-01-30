class AddLikesToImages < ActiveRecord::Migration
  def change
    add_column :images, :likes, :integer, default: 0

    Image.all.each do |image|
      image.likes = 0
      image.save
    end
  end
end
