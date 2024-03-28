<!DOCTYPE html>
<html lang="he">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Corona HMO Installation Guide</title>
    <style>
        body {
            direction: rtl;
            text-align: right;
            font-family: Arial, sans-serif;
        }

        h1 {
            text-align: center;
        }

        code {
            background-color: #f4f4f4;
            border: 1px solid #ddd;
            border-left: 3px solid #f36d33;
            color: #666;
            display: block;
            padding: 10px;
            margin: 20px 0;
            overflow: auto;
        }

        pre {
            white-space: pre-wrap;
        }
    </style>
</head>

<body>
    <h1>התקנה והרצה</h1>

    <h2>שיבוט קוד הפרויקט:</h2>
    <code>git clone https://github.com/HANIHALILI/Corona-HMO.git</code>

    <h2>הרצת הלקוח</h2>
    <ol>
        <li>פתיחת מסוף ומעבר לתקיית הclient:</li>
        <code>cd client<br>cd client-hmo</code>
        <li>התקנת תלויות:</li>
        <code>npm install</code>
        <li>הרצת הלקוח:</li>
        <code>npm start</code>
    </ol>

    <h2>הרצת השרת</h2>
    <ol>
        <li>פתיחת מסוף ומעבר לתקיית הAPI:</li>
        <code>cd API</code>
        <li>התקנת תלויות:</li>
        <code>npm install</code>
        <li>הרצת השרת:</li>
        <code>npm start</code>
    </ol>

    <p>פתח את הדפדפן שלך וגש לכתובת <code>http://localhost:3000</code>.</p>

    <h1>שימוש בפרויקט</h1>

    <h2>ממשק המשתמש</h2>
    <p>ממשק המשתמש של הפרויקט מחולק לשני חלקים עיקריים:</p>
    <ul>
        <li><strong>פרטים אישיים:</strong> ניתן לצפות בפרטים האישיים כולל מידע על חיסוני קורונה ומידע על הדבקות בקורונה.</li>
    </ul>

    <h2>פונקציונליות</h2>
    <ul>
        <li><strong>הוספת חבר קופה:</strong> ניתן להוסיף חברי קופה חדשים למאגר.</li>
        <li><strong>עדכון פרטי חבר קופה:</strong> ניתן לעדכן את הפרטים האישיים של חברי קופה.</li>
        <li><strong>מחיקת חבר קופה:</strong> ניתן למחוק חברי קופה מהמאגר.</li>
        <li><strong>הצגת נתונים סטטיסטיים:</strong> ניתן להציג נתונים סטטיסטיים על חברי קופה, כגון מספר חולים, מספר מחוסנים.</li>
    </ul>

</body>

</html>
