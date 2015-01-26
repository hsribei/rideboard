emails = open('emails.csv', 'a')
res = get_students({ 'course': 'HZ431', 'classes': 'AB', 'year': '2014', 'semester': '2', 'type': 'undergrad' })

for course in res:
  for student in course[4]:
    emails.write(str(strip_accents(student[1].decode('utf-8', 'ignore')))[0].lower() + (student[0] if len(student[0]) == 6 else '0' + student[0]) + "@dac.unicamp.br\n")

emails.close()
