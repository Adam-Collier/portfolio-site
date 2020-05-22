## PHP

### Import SVG inline

```php
<?php include("icons/my-icon.svg"); ?>

// getting an icon from a parent directory
<?php include __DIR__ . '/../icons/facebook.svg'; ?>
```

### Enqueue a script

```php
wp_enqueue_script(
    'lazysizes',
    get_template_directory_uri() . '/js/lazysizes.min.js'
  );
```

### Use variables in template parts

```php
// you can use any value including objects.
set_query_var( 'var_name_to_be_used_later', 'Value to be retrieved later' );
```

### Get template part

```php
<?php get_template_part('template_parts/griditem'); ?>
```
