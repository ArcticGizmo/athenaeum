from athenaeum.reader import Reader

def test_root_as_file():
  Reader(__file__)
  
def test_root_with_list_of_strings():
  Reader(__file__, ['..', 'images_out'])

def test_without_file():
  reader = Reader(None, ['..', 'tests'])