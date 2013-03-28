from __future__ import with_statement
from fabric.api import *
import requests
import pprint
import boto
import json


"""
Some defaults
"""
env.s3_bucket = 'minnpost.data'
env.project_name = 'minnpost-cron'
  

def s3_bucket(bucket):
  """
  Select bucket
  """
  env.s3_bucket = bucket


def cache_google_spreadsheet_to_s3(key = ''):
  """
  Cache a Google spreadsheet to S3.
  
  Ensure the following environment variables are set:
  AWS_ACCESS_KEY_ID
  AWS_SECRET_ACCESS_KEY
  """
  meta_url = 'https://spreadsheets.google.com/feeds/worksheets/' + key + '/public/basic?alt=json-in-script'
  r = requests.get(meta_url)
  meta_jsonp_text = r.text
  
  # Get meta JSON
  jsonp_prefix = 'gdata.io.handleScriptLoaded('
  jsonp_suffix = ');'

  if meta_jsonp_text.startswith(jsonp_prefix) and meta_jsonp_text.endswith(jsonp_suffix):
    meta_json_text = meta_jsonp_text[len(jsonp_prefix): -len(jsonp_suffix)]
  else:
    print 'JSONP not in correct format.'
    return
    
  meta = json.loads(meta_json_text)
  
  # Copy to S3
  s3 = boto.connect_s3()
  bucket = s3.create_bucket(env.s3_bucket)
  
  
  #key = bucket.new_key('examples/first_file.csv')
  #key.set_contents_from_filename('/home/patrick/first_file.csv')
  #key.set_acl('public-read')


def test_env():
  """
  Outputs env.
  """
  pprint.pprint(env)