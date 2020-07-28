
from reader import Reader

def _test():
  reader = Reader(__file__, ['..', 'images_in'])
  print(reader._str_path)


  image = reader.read('books.png')
  print(image)


def _main():
  # get an image

  # split vertically into books

  # analyse the center of each book for text (may need to rotate +- 90)

  # return a Book object with details about the image (title, author)
  print("---- elllo")


if __name__ == '__main__':
  # _main()
  _test()