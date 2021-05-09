'use strict';

// решаем вопросы загрузки изображений
// обработчик onchange для input file
function previewFiles() {
  var sliderContainer = document.querySelector('.slider__items'); // контейнер для слайдов
  var files    = document.querySelector('input[type=file]').files; // будет список файлов после выбора пользователя
  var file_inp = document.querySelector('.file_inp'); // ввоод имен файлов - элемент управления (будем манипулировать видимостью)
  var reader  = new FileReader();
  var progress = document.querySelector('.progress');
  var cnt=0;// количество загруженных файлов

  // асинхронно завершен очередной reader.readAsDataURL(files[cnt]);
  reader.onloadend = function () {    
     
    // обработаем
    progress.style.width = ((cnt+1)/files.length*100)+'%'; // индикация пользователю - процесс может быть длительным

    if (cnt==0) document.querySelector('.picture').src = reader.result; // первый слайд есть в макете, задаем изображение
    else {
      var slider__item = document.createElement("div"); // последующие слайды создаем и вставляем
      slider__item.classList.add("slider__item");
      sliderContainer.appendChild(slider__item);
      var picture = document.createElement("img");
      picture.classList.add("picture");
      picture.src = reader.result;
      slider__item.appendChild(picture);    
      //sliderContainer.style.transform = 'translateX(' + (-cnt*100) + '%)';    
    }

    cnt++;
    if (cnt<files.length) {    
      reader.readAsDataURL(files[cnt]); // читать дальше
    } else {    
      progress.style.visibility = "hidden";
      progress.style.height = '1px';
      sliderStart(); // запускаем управление      
    }
    
  } // reader.onloadend = function () {


  // непосредственно обработка onchange для input file
  //  вызывается несколько раз. Нам нужен вызов с непустым спискомм
  if (files) {
    file_inp.hidden = true;
    file_inp.style.height = '1px'; // прячем и убираем кнопку загрузки
    progress.style.visibility = "visible"; // прогрес индикатор покажем

    reader.readAsDataURL(files[0]);
  } else {
    progress.style.visibility = "hidden";
  }
}// function previewFiles() {


// задачи управления слайдером и сама фуекция звпуска управления
function sliderStart  () {
  var
    _slider = document.querySelector('.slider'), // основный элемент блока
    _sliderContainer = _slider.querySelector('.slider__items'), // контейнер для .slider-item
    _sliderItems = _slider.querySelectorAll('.slider__item'), // коллекция .slider-item
    _sliderControls = _slider.querySelectorAll('.slider__control'), // элементы управления
    _itemsArray = [], // массив элементов
    //_curPos = _sliderItems.length-1; // текущая позиция слайдера (будет при загрузке визуализировано последнее изображение)
    _curPos = 0; // текущая позиция слайдера (будет при загрузке визуализировано последнее изображение)
    
  // наполнение массива _itemsArray
  for (var i = 0, length = _sliderItems.length; i < length; i++) {
    _itemsArray.push({ item: _sliderItems[i], transform: 0 });
  }

  // прокрутка слайдера в требуемом направлении
  var _move1 = function (direction) {
    if (direction === 'next') _curPos++; else  _curPos--;
     
    for (var idx=0; idx<_itemsArray.length;idx++) {
      _itemsArray[idx].transform = (((_curPos-idx)/_itemsArray.length)|0)*_itemsArray.length*100;
      _itemsArray[idx].item.style.transform = 'translateX(' + _itemsArray[idx].transform + '%)';
    } 
    _sliderContainer.style.transform = 'translateX(' + (-_curPos*100) + '%)';
  }

        

        // функция, осуществляющая переход к слайду по его порядковому номеру
        /*var _moveTo = function (index) {
          var i = 0, direction = (index > _indicatorIndex) ? 'next' : 'prev';
          while (index !== _indicatorIndex && i <= _indicatorIndexMax) {
            _move(direction);
            i++;
          }
        };*/

       

        

       

        // функция, осуществляющая установку обработчиков для событий 
        var _setUpListeners = function () {
          // покажем элементы управления
          for (var i = 0, length = _sliderControls.length; i < length; i++) 
            _sliderControls[i].classList.add('slider__control_show');
          // установим обработчик
          _slider.addEventListener('click', function (e) {
            e.preventDefault();
            if (e.target.classList.contains('slider__control')) 
              _move1(e.target.classList.contains('slider__control_next') ? 'next' : 'prev');
          });
        };

        
        // установливаем обработчики для событий
        _setUpListeners();
        
        _sliderContainer.classList.add('slider__items_transform_1s')

        return {
          // метод слайдера для перехода к следующему слайду
          next: function () {
            _move1('next');
          },
          // метод слайдера для перехода к предыдущему слайду          
          left: function () {
            _move1('prev');
          }/*,
          // метод отключающий автоматическую смену слайдов
          stop: function () {
            //_config.isAutoplay = false;
            //_stopAutoplay();
          },
          // метод запускающий автоматическую смену слайдов
          cycle: function () {
            //_config.isAutoplay = true;
            //_startAutoplay();
          }*/
        }
      };
    

    