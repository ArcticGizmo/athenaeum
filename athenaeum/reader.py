import os
from pathlib import Path

import cv2

STYLES = {
  'color': cv2.IMREAD_COLOR,
  'greyscale': cv2.IMREAD_GRAYSCALE,
  'unchanged': cv2.IMREAD_UNCHANGED,
}

def _to_path(*paths):
  return os.path.join(*paths)
  
  

class Reader():
  def __init__(self, file, paths=[]):
    base = ''
    if (file is not None):
      base = os.path.dirname(file)
    self._str_path = _to_path(base, *paths)
    print(self._str_path)

  def read(self, paths, style='color'):
    path = None
    if (isinstance(paths, str)):
      path = _to_path(self._str_path, paths)
    else:
      path = _to_path(self._str_path, *paths)
    return cv2.imread(path, STYLES.get(style))