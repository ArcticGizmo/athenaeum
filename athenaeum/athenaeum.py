
from reader import Reader
from window import Window
import cv2


def _test():
    reader = Reader(__file__, ['..', 'images_in'])
    base = reader.read('books.png')
    font = cv2.FONT_HERSHEY_SIMPLEX
    text_color = (255, 0, 0)
    mode = 'normal'

    window = Window('window', base, size=(1000, 700))
    window.show()

    thresh1 = 0
    thresh2 = 100

    while True:
        image = base.copy()

        if (mode == 'outline'):
            image = cv2.Canny(image, thresh1, thresh2)
            image = cv2.putText(image, 'Tresh 1: {}'.format(
                thresh1), (10, 50), font, 1, text_color, 2, cv2.LINE_AA)
            image = cv2.putText(image, 'Tresh 2: {}'.format(
                thresh2), (10, 100), font, 1, text_color, 2, cv2.LINE_AA)

        window.image = image
        (code, key) = window.update()

        if (key == 'up'):
            thresh1 += 1
        if (key == 'down'):
            thresh1 -= 1
        if (key == 'right'):
            thresh2 += 1
        if (key == 'left'):
            thresh2 -= 1
        if (key == 'q'):
            mode = 'outline' if mode == 'normal' else 'normal'

        if (key == 'esc' or key == 'close'):
            break

    window.hide()


def _main():
    # get an image

    # split vertically into books

    # analyse the center of each book for the title (may need to rotate +- 90)

    # return a Book object with details about the image (title, author)
    print("---- elllo")


if __name__ == '__main__':
    # _main()
    _test()
