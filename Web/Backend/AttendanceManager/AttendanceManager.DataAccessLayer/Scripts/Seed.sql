 insert into Lecturers
 values('1990-05-06','121','Jan','90050601234',0,'Kowalski')

 insert into Rooms values
 ('A3','118')

  insert into TimeSlots values
 (convert(datetime, '11:45'),convert(datetime, '13:15'),'Monday')

  insert into Courses values
 ('Podstawy Programowania',8)

  insert into CourseTypes values
 (30,1)

  insert into CourseUnits values
  (1,1)

   insert into Events values
  (1, 'Podstawy Programowania - zajęcia organizacyjne',1,1,0,1,convert(datetime, '2017/05/12'),1,0,1),
  (1, 'Podstawy Programowania - zajęcia organizacyjne',1,1,1,1,convert(datetime, '2017/05/10'),1,0,1),
  (1, 'Podstawy Programowania - zajęcia organizacyjne',1,1,2,1,convert(datetime, '2017/05/14'),1,0,1)