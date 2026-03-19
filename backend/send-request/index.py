import json
import smtplib
import os
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart


def handler(event: dict, context) -> dict:
    """Отправка заявки с сайта Сельхозмаркет на email selxozmarket36@mail.ru"""

    cors_headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
    }

    if event.get('httpMethod') == 'OPTIONS':
        return {'statusCode': 200, 'headers': cors_headers, 'body': ''}

    body = json.loads(event.get('body') or '{}')

    company = body.get('company', '').strip()
    contact = body.get('contact', '').strip()
    phone = body.get('phone', '').strip()
    email = body.get('email', '').strip()
    message = body.get('message', '').strip()

    if not contact or not phone:
        return {
            'statusCode': 400,
            'headers': cors_headers,
            'body': json.dumps({'error': 'Заполните обязательные поля'})
        }

    smtp_user = 'selxozmarket36@mail.ru'
    smtp_password = os.environ['SMTP_PASSWORD']

    msg = MIMEMultipart('alternative')
    msg['Subject'] = f'Новая заявка с сайта — {company or contact}'
    msg['From'] = smtp_user
    msg['To'] = smtp_user

    html = f"""
    <html><body style="font-family: Arial, sans-serif; background: #f4f4f4; padding: 20px;">
      <div style="max-width: 600px; margin: 0 auto; background: white; border-radius: 8px; overflow: hidden;">
        <div style="background: #1a2535; padding: 24px 32px;">
          <h1 style="color: #fbbf24; margin: 0; font-size: 20px; letter-spacing: 2px;">СЕЛЬХОЗМАРКЕТ</h1>
          <p style="color: #9fb3c8; margin: 4px 0 0; font-size: 13px;">Новая заявка с сайта</p>
        </div>
        <div style="padding: 32px;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #666; width: 140px; font-size: 13px;">Организация</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: bold;">{company or '—'}</td></tr>
            <tr><td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #666; font-size: 13px;">Контактное лицо</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: bold;">{contact}</td></tr>
            <tr><td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #666; font-size: 13px;">Телефон</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #eee;"><a href="tel:{phone}" style="color: #d97706; font-weight: bold;">{phone}</a></td></tr>
            <tr><td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #666; font-size: 13px;">Email</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #eee;"><a href="mailto:{email}" style="color: #d97706;">{email or '—'}</a></td></tr>
          </table>
          <div style="margin-top: 24px;">
            <p style="color: #666; font-size: 13px; margin-bottom: 8px;">Сообщение / Запрос:</p>
            <div style="background: #f8f9fa; border-left: 3px solid #fbbf24; padding: 16px; border-radius: 4px; font-size: 14px; line-height: 1.6;">
              {message or 'Не указано'}
            </div>
          </div>
        </div>
        <div style="background: #f4f4f4; padding: 16px 32px; text-align: center;">
          <p style="color: #999; font-size: 12px; margin: 0;">Заявка отправлена с сайта selkhozmarket.ru</p>
        </div>
      </div>
    </body></html>
    """

    msg.attach(MIMEText(html, 'html', 'utf-8'))

    with smtplib.SMTP_SSL('smtp.mail.ru', 465) as server:
        server.login(smtp_user, smtp_password)
        server.sendmail(smtp_user, smtp_user, msg.as_string())

    return {
        'statusCode': 200,
        'headers': cors_headers,
        'body': json.dumps({'ok': True, 'message': 'Заявка отправлена'})
    }
