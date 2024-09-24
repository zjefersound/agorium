<?php

namespace App\Service;

use PHPMailer\PHPMailer\PHPMailer;
use Throwable;

class MailerService
{
    private PHPMailer $mailer;

    public function __construct()
    {
        $this->mailer = new PHPMailer(true);
        $this->configure();
    }

    private function configure(): void
    {
        $this->mailer->isSMTP();
        $this->mailer->Host = 'mailhog';
        $this->mailer->Port = 1025;

        $this->mailer->setFrom('agorium@email.com', 'Agorium');
    }

    public function sendWelcomeEmail(string $to, string $username): bool
    {
        try {
            $this->mailer->addAddress($to, $username);

            $this->mailer->isHTML(true);
            $this->mailer->Subject = 'Welcome to Our App!';
            $this->mailer->Body    = '<h1>Welcome, ' . $username . '!</h1><p>Thank you for signing up for our app.</p>';
            $this->mailer->AltBody = 'Welcome, ' . $username . '! Thank you for signing up for our app.';

            $this->mailer->send();
            return true;
        } catch (Throwable $th) {
            return false;
        }
    }

    public function sendCommentedEmail(string $to, int $postId): bool
    {
        try {
            $this->mailer->addAddress($to);

            $this->mailer->isHTML(true);
            $this->mailer->Subject = 'New Comment on Your Post!';
            $this->mailer->Body    = "<p>A user has commented on your post! <a href=\"/post/$postId\">Go to post</a></p>";

            $this->mailer->send();
            return true;
        } catch (Throwable $th) {
            return false;
        }
    }
}
