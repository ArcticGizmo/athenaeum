import cv2

def _create_keys():
  keys = {
    -1: 'close',
    8: 'backspace',
    27: 'esc',
    13: 'enter',
    10: 'ctrl enter',
    2490368: 'up',
    2621440: 'down',
    2424832: 'left',
    2555904: 'right',
  }
  to_find = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ`1234567890-=~!@#$%^&*()_+'

  for l in to_find:
    keys[ord(l)] = l

  return keys

KEYS = _create_keys()
SIZES = {
  'normal': cv2.WINDOW_NORMAL,
  'fullscreen': cv2.WINDOW_FULLSCREEN,
  'fit': cv2.WINDOW_AUTOSIZE
}

def parse_key(code):
  return KEYS.get(code)

class Window():
  def __init__(self, name, image, screen='normal', size=None):
    cv2.namedWindow(name, SIZES.get(screen))

    self._name = name
    self.image = image
    self._size = size
    self._show = False
    self.show()

  def show(self):
    self._show = True
    cv2.imshow(self._name, self.image)
    if (self._size):
      (width, height) = self._size
      cv2.resizeWindow(self._name, width, height)


  def hide(self):
    self._show = False
    cv2.destroyWindow(self._name)

  def update(self):
    if (self._show is False):
      return

    self.show()
    key = cv2.waitKeyEx(0)
    return (key, parse_key(key))

  
    
