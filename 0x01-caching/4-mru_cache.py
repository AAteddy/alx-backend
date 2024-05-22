#!/usr/bin/python3
"""Create a class MRUCache that inherits from
BaseCaching and is a caching system:

You must use self.cache_data - dictionary from
the parent class BaseCaching
You can overload def __init__(self): but don’t
forget to call the parent init: super().__init__()
def put(self, key, item):
Must assign to the dictionary self.cache_data
the item value for the key key.
If key or item is None, this method should not
do anything.
If the number of items in self.cache_data is
higher that BaseCaching.MAX_ITEMS:
you must discard the most recently used item
(MRU algorithm)
you must print DISCARD: with the key discarded
and following by a new line
def get(self, key):
Must return the value in self.cache_data
linked to key.
If key is None or if the key doesn’t exist in
self.cache_data, return None.
"""

BaseCaching = __import__("base_caching").BaseCaching


class MRUCache(BaseCaching):
    """LRU based caching system that
    inherits from BaseCaching.
    """

    def __init__(self):
        """Initialization"""
        super().__init__()
        self.recent_used_keys = []

    def put(self, key, item):
        """Assigns to the dictionary self.cache_data
        the item value for the key key.
        """
        if key and item:
            if len(self.cache_data) >= BaseCaching.MAX_ITEMS:
                removed_key = self.recent_used_keys.pop()
                self.cache_data.pop(removed_key)
                print("DISCARD: {}".format(removed_key))
            self.cache_data[key] = item
            self.recent_used_keys.append(key)

    def get(self, key):
        """Returns the value in self.cache_data
        linked to key.
        """
        if key is None or key not in self.cache_data.keys():
            return None
        self.recent_used_keys.remove(key)
        self.recent_used_keys.append(key)
        return self.cache_data.get(key)
