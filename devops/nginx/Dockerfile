FROM nginx:1.12.1

# Remove default configuration from Nginx
RUN rm /etc/nginx/conf.d/default.conf
# Copy the modified Nginx conf
COPY nginx.conf /etc/nginx/conf.d/

# nginx official と同じ
EXPOSE 80
