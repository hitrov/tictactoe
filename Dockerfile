# Use the official PHP image with FPM
FROM php:7.4-fpm

# Define build-time variables (ARG)
ARG DB_HOST
ARG DB_USER
ARG DB_PASSWORD
ARG DB_NAME

# Set environment variables using the ARG values
ENV DB_HOST=$DB_HOST
ENV DB_USER=$DB_USER
ENV DB_PASSWORD=$DB_PASSWORD
ENV DB_NAME=$DB_NAME
ENV TOKEN=$TOKEN
ENV API_KEY=$API_KEY

# Install necessary PHP extensions
RUN docker-php-ext-install mysqli pdo pdo_mysql

# Install Nginx
RUN apt-get update && apt-get install -y nginx

# Copy Nginx configuration file
COPY nginx/default.conf /etc/nginx/conf.d/default.conf

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

# Expose port 80
EXPOSE 80

# Start PHP-FPM and Nginx
CMD ["sh", "-c", "service nginx start && php-fpm"]
