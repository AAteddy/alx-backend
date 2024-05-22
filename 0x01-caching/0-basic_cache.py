#!/usr/bin/python3
"""Create a class BasicCache that inherits from
BaseCaching and is a caching system:

You must use self.cache_data - dictionary from the
parent class BaseCaching
This caching system doesn’t have limit
def put(self, key, item):
Must assign to the dictionary self.cache_data the
item value for the key key.
If key or item is None, this method should not do anything.
def get(self, key):
Must return the value in self.cache_data linked to key.
If key is None or if the key doesn’t exist in
self.cache_data, return None.
"""

BaseCaching = __import__("base_caching").BaseCaching


class BasicCache(BaseCaching):
    """A caching system that inherits
    from BaseCaching class.
    """

    def __init__(self):
        """Initiliaze"""
        self.cache_data = {}

    def put(self, key, item):
        """assign to the dictionary self.cache_data
        the item value for the key key.
        """
        if key and item:
            self.cache_data[key] = item

    def get(self, key):
        """Returns the value in self.cache_data
        linked to key
        """
        if key is None:
            return None
        return self.cache_data.get(key)
