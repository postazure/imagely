class Image < ActiveRecord::Base
  validates :title, presence: true
  validates :url, presence: true
  validates :username, presence: true
end
