# Use the official PHP image with FPM (Alpine for smaller size)
FROM php:7.4-fpm-alpine

# Install necessary PHP extensions
RUN docker-php-ext-install mysqli pdo pdo_mysql

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Set the working directory
WORKDIR /var/www/html

# Copy the local code to the container
COPY api /var/www/html

# Install PHP dependencies using Composer (after copying code)
RUN composer install --no-dev --optimize-autoloader --working-dir=/var/www/html

# Set proper permissions (optional, adjust based on your needs)
RUN chown -R www-data:www-data /var/www/html

# Expose port 9000 for PHP-FPM
EXPOSE 9000

# Start PHP-FPM
CMD ["php-fpm"]
