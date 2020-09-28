# kumonapp
Administration helper for Kumon learning centers


## Installation

Live view at: http://kumonadmin-env.eba-7dr4vmxn.us-east-2.elasticbeanstalk.com/login
To run locally, install the compressed project version found in app folder. 
Create .env file with env variables specified below.
Decompress, navigate to folder in console and run:

```bash
npm start
```

## Env Variables

DB_HOST=  
DB_USER=  
DB_PASSWORD=  
JWT_SECRET=  
SESSION_SECRET=  
REGISTER_SECRET_KEY=  
IAM_ACCESS_KEY_ID=  
IAM_SECRET_ACCESS_KEY=  
AWS_REGION=  
AWS_S3_BUCKET=  

## About

Esta es una aplicación web creada con el fin de ayudar en la administración de centros Kumon. Fue originalmente diseñada para Kumon Paseo de la Cultura, Playa del Carmen, a petición de la instructora a cargo. La aplicación ayuda en las tareas siguientes:

  + Registro de alumnos al sistema.
  + Control sobre información de alumnos (Información Personal, Información de Centro).
  + Recordatorio de aniversario Kumon de 3/6/9/12 meses para agendar citas con padres de alumnos.
  + Recordatorio de cumpleaños de alumnos.
  + Recordatorio de personas que deben pagos de mes actual.
  + Control sobre historial de pagos de último par de meses.
  + Posibilidad de subir archivos de identificación de alumnos (Foto Personal, Boleta Mensual).
  + Registro personalizado de usuarios para asistentes.
  + Posibilidad de agregar comentarios (observaciones) para cada alumno.
  + Posiblidad de ver la persona que agregó comentario.
  + Visualización de últimos comentarios hechos por usuario.

## License
[MIT](https://choosealicense.com/licenses/mit/)
